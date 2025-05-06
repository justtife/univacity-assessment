export interface Program {
    id: string;
    title: string;
    description: string;
    shortDesc: string;
    country: string;
    university: string;
    backImageUrl: string;
    mainImageUrl: string;
    views: number;
    impressions: number;
    programDetails: ProgramDetail[];
    requirements: string[];
    structure: string;
    feeBreakdown: FeeItem[];
    additionalInfo: AdditionalInfo;
}


export interface ProgramDetail {
    name: string;
    value: string;
    currency?: string;
}

export interface FeeItem {
    amount: number;
    currency: string;
    description: string;
}

export interface AdditionalInfo {
    intake: string;
    location: string;
    applicationDeadline?: string;
}

// export interface FilterOptions {
//     countries: string[];
//     disciplines: string[];
//     degreeTypes: string[];
//     tuitionRange: {
//         min: number;
//         max: number;
//     };
// }

// export interface SearchParams {
//     countries?: string[];
//     disciplines?: string[];
//     minTuition?: number;
//     maxTuition?: number;
//     searchTerm?: string;
// }