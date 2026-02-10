import natural from 'natural';

// A simple dictionary of technical skills to look for
const SKILL_KEYWORDS = [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go', 'rust',
    'react', 'angular', 'vue', 'next.js', 'node.js', 'express', 'django', 'flask', 'spring', 'laravel',
    'html', 'css', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'linux', 'agile', 'scrum',
    'machine learning', 'deep learning', 'nlp', 'data science', 'tensorflow', 'pytorch', 'pandas', 'numpy'
];

export const extractSkills = (text: string): string[] => {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text.toLowerCase());

    // Find intersection between tokens and skill keywords
    const foundSkills = new Set<string>();

    tokens.forEach((token: string) => {
        if (SKILL_KEYWORDS.includes(token)) {
            foundSkills.add(token);
        }
    });

    // Also check for multi-word skills (simple sliding window or just string includes for efficiency in small list)
    SKILL_KEYWORDS.forEach(skill => {
        if (skill.includes(' ') && text.toLowerCase().includes(skill)) {
            foundSkills.add(skill);
        }
    });

    return Array.from(foundSkills);
};
