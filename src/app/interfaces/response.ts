import { Article } from './article';

export interface Response {
    status  : string,
    totalResults : number,
    articles : Article[]
}
