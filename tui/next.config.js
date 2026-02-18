module.exports = {
  async rewrites() {
    return [
      {
        source: '/resume',
        destination: '/api/resume',
      },
    ];
  },
};
