import PageWrapper from "@/components/PageWrapper"
import { getQuestionById } from "@/services/question"
import { genComponent } from "@/components/QuestionComponents"
import styles from "@/styles/Question.module.scss"

type PropsType = {
  errno: number
  data?: {
    _id: string
    title: string
    desc?: string
    js?: string
    css?: string
    isDeleted: boolean
    isPublished: boolean
    componentList: Array<any>
  }
  msg?: string
}

export default function Question(props: PropsType) {
  const { errno, data, msg = "" } = props

  // 数据错误
  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    )
  }

  const { _id: id, title = "", desc = "", isDeleted, isPublished, componentList = [] } = data || {}

  // 已经被删除了 提示错误
  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </PageWrapper>
    )
  }

  // 问卷尚未发布 提示错误
  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    )
  }

  // 遍历组件
  const ComponentListElem = (
    <>
      {componentList.map(c => {
        const ComponentElem = genComponent(c)
        return (
          <div key={c.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        )
      })}
    </>
  )

  return (
    <PageWrapper title={title} desc={desc}>
      <form method="post" action="/api/answer">
        {/* 隐藏域提交问卷id */}
        <input type="hidden" name="questionId" value={id} />
        {ComponentListElem}
        <div className={styles.submitBtnContainer}>
          {/* <input type="submit" value="提交" /> */}
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  )
}

// 获取动态路由参数传入页面
export async function getServerSideProps(context: any) {
  const { id = "" } = context.params

  // 从服务端根据id await获取数据
  const data = await getQuestionById(id)

  return {
    props: data,
  }
}
