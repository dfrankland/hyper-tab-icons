module.exports = {
  compile: [
    'cc',
    'ccache',
    'clang',
    'gcc',
    'gmake',
    'make',
    'xcodebuild',
  ],
  clojure: [
    'lein',
    'planck'
  ],
  docker: [
    'docker-compose',
  ],
  git: [
    'git-remote-ftp',
    'git-remote-ftps',
    'git-remote-http',
    'git-remote-https',
  ],
  monitor: [
    'htop',
    'iftop',
    'top',
  ],
  nodejs: [
    'node',
  ],
  rails: [
    'rails',
    'rake'
  ],
  ruby: [
    'irb',
    'sidekiq',
  ],
  shell: [
    'bash',
    'fish',
    'zsh',
  ],
};
