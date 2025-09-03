module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-max-line-length': [2, 'always', 100]
    },
    ignores: [(message) => message.includes('[skip ci]')]
}
