export default {
  layout: {
    background: '#E5F7FF'
  },
  content: {
    wrapper: {
      padding: '5px 5px 10px',
    },
    div: {
      padding: 10,
      minHeight: 280,
      height: 'calc(100vh - 60px)',
      borderRadius: '3px',
      background: '#E5F7FF',
      position: 'relative'
    }
  },
  draggable: {
    wrapper: {
      display: 'inline-block',
      position: 'absolute'
    }
  },
  zoom: {
    transition: 'all 0.2s',
    position: 'fixed',
    bottom: 10,
    left: 90
  },
  notCollapsedZoom: {
    left: 210
  }
};
