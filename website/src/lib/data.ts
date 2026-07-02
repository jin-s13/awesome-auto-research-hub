import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export type LinkMap = Record<string, string>;
export type SourceRef = { repo: string; category?: string };

export type ScoreEvidence = {
  source?: string;
  field?: string;
  detail?: string;
  span?: {
    source?: string;
    field?: string;
    marker?: string;
    start?: number;
    end?: number;
    text?: string;
  };
};

export type ScoreComponent = {
  value: number;
  available?: boolean;
  confidence?: string;
  explanation?: string;
  explanation_zh?: string;
  evidence?: ScoreEvidence[];
};

export type ScoreInfo = {
  total: number;
  read_first_score?: number;
  components?: Record<string, ScoreComponent>;
  applied_weights?: Record<string, number>;
  ranking_profile?: string;
  field_roles?: string[];
  rank_sensitivity?: {
    stability?: string;
    rank_range?: number;
    profiles?: Record<string, { rank?: number; score?: number }>;
  };
  warnings?: string[];
  keyword_scores?: Record<string, number>;
  author_bonus?: number;
  passing_score?: number;
  is_qualified?: boolean;
};

export type AnalysisInfo = {
  innovations?: string[];
  methodology?: string;
  key_results?: string;
  limitations?: string[];
  tech_stack?: string[];
};

export type Paper = {
  id: string;
  title: string;
  year: number;
  venue: string;
  category?: string;
  paper_type?: string[] | string;
  tags: string[];
  representations?: string[];
  input_modalities?: string[];
  output_modalities?: string[];
  links: LinkMap;
  preview?: string;
  stars?: number;
  sources: SourceRef[];
  notes?: string;
  score?: ScoreInfo;
  tldr?: string;
  reasoning?: string;
  analysis?: AnalysisInfo;
  // Bilingual (Chinese) fields
  title_cn?: string;
  abstract_cn?: string;
  tldr_cn?: string;
  reasoning_cn?: string;
  analysis_cn?: AnalysisInfo;
  taxonomy?: {
    primary?: string;
    secondary?: string[];
    confidence?: number;
    evidence?: string;
  };
};

export type Resource = {
  id: string;
  name: string;
  name_zh?: string;
  category?: string;
  type?: string;
  resource_type?: string;
  year?: number;
  language?: string[];
  kernel?: string[];
  description: string;
  description_zh?: string;
  tags: string[];
  links: LinkMap;
  preview?: string;
  stars?: number;
  score?: number | ScoreInfo;
  sources: SourceRef[];
  notes?: string;
  notes_zh?: string;
  related_papers?: RelatedPaperRef[];
};

export type RelatedPaperRef = {
  id?: string;
  title?: string;
  title_zh?: string;
  url?: string;
};

export type SurveyPaperRef = {
  id: string;
  title: string;
  year?: number;
  score?: number;
  url?: string;
};

export type SurveyTopic = {
  id: string;
  label: string;
  label_zh?: string;
  description?: string;
  description_zh?: string;
  paper_count: number;
  top_tags: string[];
  component_averages?: Record<string, number>;
  top_papers: SurveyPaperRef[];
  related_work_outline: string[];
  related_work_outline_zh?: string[];
  literature_review?: Record<string, unknown>;
  literature_review_zh?: Record<string, unknown>;
};

export type SurveyIndex = {
  schema_version?: string;
  generated_at?: string;
  topics: SurveyTopic[];
};

export type TaxonomyNode = {
  id: string;
  label: string;
  label_zh?: string;
  description?: string;
  description_zh?: string;
  keywords?: string[];
  children?: TaxonomyNode[];
};

export type TaxonomyIndex = {
  schema_version?: string;
  generated_at?: string;
  mode?: string;
  nodes: TaxonomyNode[];
};

function loadYaml<T>(relativePath: string): T[] {
  const file = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(file)) {
    return [];
  }
  const raw = fs.readFileSync(file, 'utf-8');
  const parsed = YAML.parse(raw);
  return Array.isArray(parsed) ? parsed as T[] : [];
}

function loadYamlObject<T>(relativePath: string, fallback: T): T {
  const file = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(file)) {
    return fallback;
  }
  const raw = fs.readFileSync(file, 'utf-8');
  const parsed = YAML.parse(raw);
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as T : fallback;
}

function scoreValue(score: ScoreInfo | number | undefined): number {
  if (typeof score === 'number') return score;
  return score?.read_first_score ?? score?.total ?? 0;
}

function resourceScoreValue(resource: Resource): number {
  return scoreValue(resource.score) || resource.stars || 0;
}

export function getPapers(): Paper[] {
  return loadYaml<Paper>('data/papers.yaml').sort((a, b) => scoreValue(b.score) - scoreValue(a.score) || b.year - a.year || a.title.localeCompare(b.title));
}

export function getPaper(id: string): Paper | undefined {
  return getPapers().find((p) => p.id === id);
}

export function paperTypeList(paper: Paper): string[] {
  const raw = paper.paper_type;
  const values = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const fallback = paper.category ? [paper.category] : [];
  return uniq([...values, ...fallback].filter(Boolean));
}

export function paperTypeLabel(paper: Paper): string {
  const types = paperTypeList(paper);
  return types.length > 0 ? types.join(', ') : 'method';
}

export function paperTypeFilterValue(paper: Paper): string {
  const types = paperTypeList(paper);
  return types.length > 0 ? types.join('|') : 'method';
}

export function getDatasets(): Resource[] {
  const papersById = new Map(getPapers().map((paper) => [paper.id, paper]));
  return loadYaml<Resource>('data/datasets.yaml')
    .map((dataset) => {
      if (dataset.score != null) return dataset;
      const relatedPaper = (dataset.related_papers || [])
        .map((ref) => ref.id ? papersById.get(ref.id) : undefined)
        .find(Boolean);
      const score = scoreValue(relatedPaper?.score);
      return score > 0 ? { ...dataset, score } : dataset;
    })
    .sort((a, b) => resourceScoreValue(b) - resourceScoreValue(a) || (b.stars || 0) - (a.stars || 0) || (b.year || 0) - (a.year || 0) || a.name.localeCompare(b.name));
}

export function getDataset(id: string): Resource | undefined {
  return getDatasets().find((d) => d.id === id);
}

export function getProjects(): Resource[] {
  return loadYaml<Resource>('data/projects.yaml').sort((a, b) => (b.stars || 0) - (a.stars || 0) || (a.type || '').localeCompare(b.type || '') || a.name.localeCompare(b.name));
}

export function getResources(): Resource[] {
  return loadYaml<Resource>('data/resources.yaml').sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

export function getSurveys(): SurveyTopic[] {
  const surveyIndex = loadYamlObject<SurveyIndex>('data/surveys.yaml', { topics: [] });
  return (surveyIndex.topics || []).sort((a, b) => b.paper_count - a.paper_count || a.label.localeCompare(b.label));
}

export function getTaxonomy(): TaxonomyNode[] {
  const taxonomy = loadYamlObject<TaxonomyIndex>('data/taxonomy.yaml', { nodes: [] });
  return taxonomy.nodes || [];
}

export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function getStats() {
  const papers = getPapers();
  const datasets = getDatasets();
  const projects = getProjects();
  let resources: Resource[] = [];
  try {
    resources = getResources();
  } catch {
    resources = [];
  }
  return {
    papers: papers.length,
    datasets: datasets.length,
    projects: projects.length,
    resources: resources.length,
    sources: uniq([...papers, ...datasets, ...projects, ...resources].flatMap((x: any) => (x.sources || []).map((s: SourceRef) => s.repo))).length,
    years: uniq(papers.map((p) => p.year)).sort((a, b) => b - a),
    categories: uniq(papers.flatMap((p) => paperTypeList(p))).sort()
  };
}
