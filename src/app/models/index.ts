export interface Program {
    id: string;
    title: string;
    description: string;
    shortDesc: string;
    country: string;
    university: string;
    category: string;
    backImageUrl: string;
    mainImageUrl: string;
    views: number;
    impressions: number;
    programDetails: ProgramDetails;
    requirements: string[];
    structure: string;
    feeBreakdown: FeeItem[];
    additionalInfo: AdditionalInfo;
}

export interface ProgramDetails {
    duration: string;
    degree_level: string;
    currency: string;
    tuition: number;
    study_mode: string;
    language: string[];
}

export interface FeeItem {
    amount: number;
    currency: string;
    description: string;
}

export interface AdditionalInfo {
    intake: string;
    location: string;
    applicationDeadline: string;
}
export interface OutputFormat {
    id: string;
    main?: string | number;
    image?: string;
    subImage?: string;
    additional?: string;
}
export interface FilterPrice {
    lower: number;
    upper: number;
    matchedPrograms?: OutputFormat[]
}
export interface FilterModel {
    [type: string]: OutputFormat[] | OutputFormat | FilterPrice | boolean;
}
