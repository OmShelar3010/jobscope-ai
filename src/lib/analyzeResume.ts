const STOP_WORDS = [
    "the", "and", "or", "a", "an", "to", "for", "with", "in", "on", "at",
    "of", "is", "are", "was", "were", "be", "as", "by", "this", "that"
];

function cleanText(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 2 && !STOP_WORDS.includes(word));
}

export function analyzeResume(resumeText: string, jobDesc: string) {
    const resumeWords = cleanText(resumeText);
    const jobWords = cleanText(jobDesc);

    const uniqueJobWords = [...new Set(jobWords)];

    const matchedSkills = uniqueJobWords.filter(word =>
        resumeWords.includes(word)
    );

    const missingSkills = uniqueJobWords.filter(word =>
        !resumeWords.includes(word)
    );

    const score = Math.round(
        (matchedSkills.length / uniqueJobWords.length) * 100
    );

    return {
        score,
        matchedSkills: matchedSkills.slice(0, 20),
        missingSkills: missingSkills.slice(0, 20),
    };
}