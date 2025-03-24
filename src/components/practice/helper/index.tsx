export const regexInput = /@\[([^\]]+)]\[(\d+)]/g
export const findInput = (text: any) => {
  const regex = regexInput
  const result = []
  let match
  while ((match = regex.exec(text)) !== null) {
    result.push({
      position: parseInt(match[2], 10),
      text: match[1]
    })
  }
  return result
}

export const locationQuestion = (questionList: any) => {
  let location = 0
  return questionList?.map((item: any) => {
    const length =
      item.type === 'gap_filling'
        ? findInput(item.gap_filling).length
        : item.type === 'multiple'
        ? item.mutilple_choice.filter((elm: any) => elm.correct).length
        : 1
    const start = location + 1
    location += length
    return { ...item, location: { start, end: location } }
  })
}
