export interface Guide {
    _id: string;
    reportId: string;
    name: string;
    year: string;
    pdfName: string;
    source: string;
    link: string;
    classification: string;
    description: string;
    sourceFilters?: string[];
    typeFilters?: string[];
    yearFilters?: string[];
};

