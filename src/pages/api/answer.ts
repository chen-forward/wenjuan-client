import { NextApiRequest, NextApiResponse } from "next"
import { postAnswer } from "@/services/answer"

// 将问卷id和组件列表放在同一级
function genAnswerInfo(reqBody: any) {
  const answerList: any[] = []

  Object.keys(reqBody).forEach(key => {
    if (key === "questionId") return

    answerList.push({ componentFeId: key, value: reqBody[key] })
  })

  return {
    questionId: reqBody.questionId || "",
    answerList,
  }
}

// 表单数据会提交到这个api
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    // 不是post 则返回错误
    res.status(200).json({ errno: -1, msg: "Method 错误" })
  }

  // 获取并格式化表单数据
  const answerInfo = genAnswerInfo(req.body)
  console.log("answerInfo", answerInfo)

  try {
    // 提交到服务端 Mock
    const resData = await postAnswer(answerInfo)
    console.log("resData", resData)

    if (resData.errno === 0) {
      res.redirect("/success") //提交成功 跳转
    } else {
      res.redirect("/fail")
    }
  } catch (err) {
    res.redirect("/fail")
  }
}

//   return res.status(200).json({ errno: 0 })
