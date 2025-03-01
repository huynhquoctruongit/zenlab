export const regexInput = /\$\[(\d+)\]\[([^\]]+)\]/g
export const findInput = (text: any) => {
  const regex = regexInput
  const result = []
  let match
  while ((match = regex.exec(text)) !== null) {
    result.push({
      position: parseInt(match[1], 10),
      text: match[2]
    })
  }
  return result
}

export const locationQuestion = (questionList: any) => {
  let location = 0
  return questionList?.map((item: any) => {
    const length =
      item.type === 'fill_blank'
        ? findInput(item.fill_blank).length
        : item.type === 'multiple'
        ? item.mutilple_choice.filter((elm: any) => elm.correct).length
        : 1
    const start = location + 1
    location += length
    return { ...item, location: { start, end: location } }
  })
}
