import type { Lang } from './lang';

export const langs = [
  { code: 'en' as Lang, label: 'English' },
  { code: 'zh' as Lang, label: '中文' },
] as const;

const translations: Record<string, Record<Lang, string>> = {
  // Base.astro - Nav
  'nav.home': { en: 'Home', zh: '首页' },
  'nav.papers': { en: 'Papers', zh: '论文' },
  'nav.analysis': { en: 'Analysis', zh: '分析' },
  'nav.surveys': { en: 'Analysis', zh: '分析' },
  'nav.trends': { en: 'Trends', zh: '趋势' },
  'nav.datasets': { en: 'Datasets', zh: '数据集' },
  'nav.projects': { en: 'Projects', zh: '项目' },
  'nav.resources': { en: 'Resources', zh: '资源' },
  'brand.subtitle': { en: 'Papers · Datasets · Projects', zh: '论文 · 数据集 · 项目' },
  'nav.github': { en: 'GitHub', zh: 'GitHub' },

  // index.astro - Hero
  'hero.eyebrow': { en: 'Research papers, datasets, and open-source projects', zh: '研究论文、数据集与开源项目' },
  'hero.description': {
    en: 'Automatically curated from research paper sources. Built with <a href="https://github.com/jin-s13/awesome-hub-generator">awesome-hub-generator</a>.',
    zh: '自动从多来源研究论文中精选。基于 <a href="https://github.com/jin-s13/awesome-hub-generator">awesome-hub-generator</a> 构建。',
  },
  'hero.explorePapers': { en: 'Explore papers', zh: '浏览论文' },
  'hero.browseProjects': { en: 'Browse projects', zh: '浏览项目' },
  'hero.categories': { en: 'Categories:', zh: '分类：' },

  // index.astro - Stats
  'stat.papers': { en: 'Papers', zh: '论文' },
  'stat.datasets': { en: 'Datasets', zh: '数据集' },
  'stat.projects': { en: 'Projects', zh: '项目' },
  'stat.resources': { en: 'Resources', zh: '资源' },
  'stat.sources': { en: 'Sources', zh: '来源' },

  // index.astro - Sections
  'section.latestPapers': { en: 'Latest papers', zh: '最新论文' },
  'section.featuredResearch': { en: 'Featured research', zh: '精选研究' },
  'section.viewAllPapers': { en: 'View all papers →', zh: '查看全部论文 →' },
  'section.datasets': { en: 'Datasets', zh: '数据集' },
  'section.datasetZoo': { en: 'Dataset zoo', zh: '数据集大全' },
  'section.viewAllDatasets': { en: 'View all →', zh: '查看全部 →' },
  'section.projects': { en: 'Projects', zh: '项目' },
  'section.openSourceStack': { en: 'GitHub projects', zh: 'GitHub 项目' },
  'section.viewAllProjects': { en: 'View all projects →', zh: '查看全部项目 →' },

  // papers.astro
  'pages.papers.eyebrow': { en: 'Research index', zh: '研究索引' },
  'pages.papers.title': { en: 'Papers', zh: '论文' },
  'pages.papers.description': {
    en: 'Automatically collected and categorized papers from arXiv, upstream awesome lists, and other research sources.',
    zh: '从 arXiv、上游 awesome 列表和其他研究源自动收集并分类的论文。',
  },

  // analysis.astro
  'pages.analysis.eyebrow': { en: 'Aggregate analysis', zh: '汇总分析' },
  'pages.analysis.title': { en: 'Research Analysis', zh: '研究分析' },
  'pages.analysis.description': {
    en: 'Cross-paper synthesis of shared research patterns, differences, mainstream directions, and trend evolution.',
    zh: '跨论文归纳研究共性、关键差异、主流方向与趋势演进。',
  },

  // surveys.astro legacy keys
  'pages.surveys.eyebrow': { en: 'Aggregate analysis', zh: '汇总分析' },
  'pages.surveys.title': { en: 'Research Analysis', zh: '研究分析' },
  'pages.surveys.description': {
    en: 'Aggregated topic summaries, scoring patterns, and related-work outlines generated from the research index.',
    zh: '从研究索引生成的主题汇总、评分模式和相关工作提纲。',
  },

  // datasets.astro
  'pages.datasets.eyebrow': { en: 'Dataset zoo', zh: '数据集大全' },
  'pages.datasets.title': { en: 'Datasets', zh: '数据集' },
  'pages.datasets.description': {
    en: 'Datasets grouped by representation and task.',
    zh: '按表示方法和任务分组的数据集。',
  },
  'dataset.backToDatasets': { en: '← Back to datasets', zh: '← 返回数据集列表' },
  'dataset.analysis': { en: 'Dataset Analysis', zh: '数据集分析' },
  'dataset.provenance': { en: 'Provenance', zh: '来源线索' },
  'dataset.provenanceText': { en: 'Collected from {0}.', zh: '来源：{0}。' },
  'dataset.provenanceUnknown': { en: 'Source metadata is not available.', zh: '暂无明确来源元数据。' },
  'dataset.relatedPapers': { en: 'Related papers', zh: '关联论文' },

  // projects.astro
  'pages.projects.eyebrow': { en: 'GitHub project index', zh: 'GitHub 项目索引' },
  'pages.projects.title': { en: 'Projects', zh: '项目' },
  'pages.projects.description': {
    en: 'Relevant GitHub projects discovered from upstream awesome lists and repository search. Some map to papers, while others are high-star implementation, dataset, or infrastructure projects.',
    zh: '从上游 awesome 列表和 GitHub 搜索中发现的相关项目。有些对应论文，有些是高星实现、数据或基础设施项目。',
  },

  // trends.astro
  'pages.trends.eyebrow': { en: 'Research landscape', zh: '研究概览' },
  'pages.trends.title': { en: 'Trends', zh: '趋势' },
  'pages.trends.description': {
    en: 'Keyword frequency, scoring patterns, and year distribution across {0} papers.',
    zh: '关键词频率、评分模式及 {0} 篇论文的年份分布。',
  },
  'trends.keywordScoreTitle': { en: 'Keyword score trends', zh: '关键词评分趋势' },
  'trends.keywordScoreSubtitle': {
    en: 'Weighted keyword distribution based on LLM scoring (higher total indicates more attention)',
    zh: '基于 LLM 评分的加权关键词分布（总分越高表示该方向论文越受关注）',
  },
  'trends.tagFrequencyTitle': { en: 'Tag frequency Top 30', zh: '标签频率 Top 30' },
  'trends.tagFrequencySubtitle': {
    en: 'Most frequent keywords in paper tags',
    zh: '论文标签中出现频率最高的关键词',
  },
  'trends.yearDistributionTitle': { en: 'Year distribution', zh: '年份分布' },
  'trends.yearDistributionSubtitle': {
    en: 'Papers distributed by year',
    zh: '论文按年份分布情况',
  },
  'trends.papers': { en: 'papers', zh: '篇论文' },

  // papers/[id].astro
  'paper.backToPapers': { en: '← Back to papers', zh: '← 返回论文列表' },
  'paper.tldr': { en: 'TLDR', zh: 'TLDR' },
  'paper.reasoning': { en: 'Reasoning', zh: '评分理由' },
  'paper.keywordScores': { en: 'Keyword Scores', zh: '关键词评分' },
  'paper.deepAnalysis': { en: 'Deep Analysis', zh: '深度分析' },
  'paper.innovations': { en: 'Innovations', zh: '创新点' },
  'paper.methodology': { en: 'Methodology', zh: '方法' },
  'paper.keyResults': { en: 'Key Results', zh: '关键结果' },
  'paper.limitations': { en: 'Limitations', zh: '局限性' },
  'paper.techStack': { en: 'Tech Stack', zh: '技术栈' },
  'paper.resources': { en: 'Resources', zh: '资源' },
  'paper.tags': { en: 'Tags', zh: '标签' },

  // PaperCard.astro
  'paperCard.analysis': { en: 'Analysis', zh: '解读' },
  'paperCard.details': { en: 'Details', zh: '详情' },
  'paperList.loadMore': { en: 'Show more papers', zh: '加载更多论文' },
  'paperList.empty': { en: 'No papers match current filters.', zh: '没有匹配当前筛选的论文。' },

  // FilterBar.astro
  'filter.search': { en: 'Search', zh: '搜索' },
  'filter.category': { en: 'Category', zh: '分类' },
  'filter.year': { en: 'Year', zh: '年份' },
  'filter.allCategories': { en: 'All categories', zh: '全部分类' },
  'filter.allYears': { en: 'All years', zh: '全部年份' },
  'filter.sort': { en: 'Sort', zh: '排序' },
  'filter.sortScore': { en: 'Score', zh: '分数' },
  'filter.sortStars': { en: 'Stars', zh: '星标' },
  'filter.sortYear': { en: 'Year', zh: '年份' },
  'filter.sortAlpha': { en: 'A-Z', zh: '首字母' },
  'filter.reset': { en: 'Reset', zh: '重置' },
  'filter.resultCount': { en: '{0} / {1} shown', zh: '显示 {0} / {1}' },

  // ResourceCard.astro
  'resource.language': { en: 'Language:', zh: '语言：' },
  'resource.kernel': { en: 'Kernel:', zh: '内核：' },
  'resource.stars': { en: 'stars', zh: '星标' },
};

export function t(key: string, lang: Lang, ...args: (string | number)[]): string {
  const entry = translations[key];
  if (!entry) return key;
  let text = entry[lang] ?? entry.en ?? key;
  if (args.length > 0) {
    args.forEach((arg, i) => {
      text = text.replace(new RegExp(`\\{${i}\\}`, 'g'), String(arg));
    });
  }
  return text;
}

export function useTranslations(lang: Lang) {
  return (key: string, ...args: (string | number)[]) => t(key, lang, ...args);
}
