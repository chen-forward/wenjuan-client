import { post } from "./ajax"

// 提交答卷对接服务端
export function postAnswer(answerInfo: any) {
    const url = "/api/answer"
    const data = post(url, answerInfo)
    return data
}