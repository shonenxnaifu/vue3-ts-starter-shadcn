function getOrCreateTooltip(chart: any): HTMLElement {
  let tooltipEl = chart.canvas.parentNode.querySelector('div')

  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.style.background = 'rgba(255, 255, 255)'
    tooltipEl.style.borderRadius = '8px'
    tooltipEl.style.borderWidth = '1px'
    tooltipEl.style.borderColor = 'rgb(228, 228, 231)'
    tooltipEl.style.color = 'rgba(0, 0, 0)'
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.display = 'block'
    tooltipEl.style.transform = 'translate(-50%, 0)'
    tooltipEl.style.transition = 'all .1s ease'

    const toolTipContent = document.createElement('div')
    toolTipContent.style.margin = '0px'

    tooltipEl.appendChild(toolTipContent)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }

  return tooltipEl
}

export function externalTooltipHandler(context: any): void {
  // Tooltip Element
  const { chart, tooltip } = context
  const tooltipEl = getOrCreateTooltip(chart)
  tooltipEl.style.display = 'block'

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.display = 'none'
    return
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || []

    const titleWrapper = document.createElement('div')

    titleLines.forEach((title: string) => {
      const spanEl = document.createElement('span')
      const text = document.createTextNode(title)

      spanEl.appendChild(text)
      titleWrapper.appendChild(spanEl)
    })

    const itemsWrapper = document.createElement('div')
    const { dataPoints } = tooltip
    dataPoints.forEach((item: any, i: number) => {
      const colors = tooltip.labelColors[i]

      const span = document.createElement('span')
      span.style.background = colors.backgroundColor
      span.style.borderColor = colors.borderColor
      span.style.borderWidth = '2px'
      span.style.borderRadius = '50%'
      span.style.marginRight = '10px'
      span.style.height = '10px'
      span.style.width = '10px'
      span.style.display = 'inline-block'

      const itemParentEl = document.createElement('div')
      const itemLabelEl = document.createElement('div')
      itemLabelEl.style.backgroundColor = 'inherit'
      itemLabelEl.style.color = 'rgb(69,85,108)'

      const itemValuelEl = document.createElement('div')
      itemValuelEl.style.backgroundColor = 'inherit'

      const textLabel = document.createTextNode(item.dataset.label)
      let textValue = document.createTextNode('')
      if (item.dataset.yAxisID === 'y1') {
        textValue = document.createTextNode(`USD$ ${item.formattedValue}`)
      }

      if (item.dataset.yAxisID === 'y2') {
        textValue = document.createTextNode(`${item.formattedValue}`)
      }

      itemLabelEl.appendChild(span)
      itemLabelEl.appendChild(textLabel)
      itemValuelEl.appendChild(textValue)
      itemParentEl.appendChild(itemLabelEl)
      itemParentEl.appendChild(itemValuelEl)

      itemsWrapper.appendChild(itemParentEl)
    })

    const elRoot = tooltipEl.querySelector('div')

    // Remove old children
    while (elRoot?.firstChild) {
      elRoot.firstChild.remove()
    }

    // Add new children
    elRoot?.appendChild(titleWrapper)
    elRoot?.appendChild(itemsWrapper)
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

  // Display, position, and set styles for font
  tooltipEl.style.opacity = '1'
  tooltipEl.style.left = `${positionX + tooltip.caretX}px`
  tooltipEl.style.top = `${positionY + tooltip.caretY}px`
  tooltipEl.style.font = tooltip.options.bodyFont.string
  tooltipEl.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`
}
