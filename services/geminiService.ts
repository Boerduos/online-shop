// 这是一个本地模拟的服务，替代原本的 Gemini AI
// 移除对 @google/genai 的依赖，防止因 process.env 导致的页面崩溃

export const askProductQuestion = async (productName: string, productDescription: string, question: string): Promise<string> => {
  // 模拟网络延迟，让体验更真实
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerQuestion = question.toLowerCase();

  // 本地简单的关键词匹配逻辑
  if (lowerQuestion.includes('价格') || lowerQuestion.includes('多少钱') || lowerQuestion.includes('贵')) {
    return `这款 ${productName} 当前售价非常实惠，仅需我们标注的价格。物有所值！`;
  }
  
  if (lowerQuestion.includes('发货') || lowerQuestion.includes('快递') || lowerQuestion.includes('多久')) {
    return "我们将在下单后 24 小时内为您安排发货，通常 3-5 天送达。";
  }

  if (lowerQuestion.includes('质量') || lowerQuestion.includes('好吗') || lowerQuestion.includes('耐用')) {
    return "我们对质量严格把关。这款产品经过多重检测，耐用性非常好，请放心购买。";
  }

  if (lowerQuestion.includes('退') || lowerQuestion.includes('保修') || lowerQuestion.includes('售后')) {
    return "我们提供 7 天无理由退换货服务，并提供一年的质保。";
  }

  if (lowerQuestion.includes('介绍') || lowerQuestion.includes('描述') || lowerQuestion.includes('是什么')) {
    return `简单来说：${productDescription.substring(0, 50)}... 更多详情请看上方描述。`;
  }

  // 默认回复
  return "这是一个很好的问题！作为本地助手，我建议您查看详细的产品描述，或者直接联系我们的客服人员获取更多特定信息。";
};