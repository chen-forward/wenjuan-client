import { get } from "./ajax"

export function getQuestionById(id: string) {
    const url = `/api/question/${id}`
    const data = get(url)
    return data
}