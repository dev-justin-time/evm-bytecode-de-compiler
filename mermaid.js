document.addEventListener('DOMContentLoaded', () => {
  // Initialize Mermaid
  mermaid.initialize({
    theme: 'neutral',
    flowchart: { curve: 'basis' }
  });

  // Highlight logic
  const mermaidNodes = document.querySelectorAll('.mermaid-controls button.small');

  mermaidNodes.forEach(button => {
    button.addEventListener('click', () => {
      const stageId = button.getAttribute('data-stage');
      highlightStage(stageId);
    });
  });

  function highlightStage(stageId) {
    const stages = document.querySelectorAll('.mermaid-controls .stage');
    stages.forEach(stage => stage.classList.remove('highlight'));

    const selectedStage = document.getElementById(`stage-${stageId}`);
    if (selectedStage) {
      selectedStage.classList.add('highlight');
    }

    // Highlight corresponding Mermaid node
    const mermaidChart = document.querySelector('.mermaid-container .mermaid');
    if (mermaidChart) {
      const mermaidSvg = mermaidChart.querySelector('svg');
      if (mermaidSvg) {
        const nodes = mermaidSvg.querySelectorAll('g.node');
        nodes.forEach(node => node.classList.remove('highlight'));

        const targetNode = mermaidSvg.querySelector(`g.node[data-id="stage-${stageId}"]`);
        if (targetNode) {
          targetNode.classList.add('highlight');
        }
      }
    }
  }
});
