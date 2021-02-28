var chai = require('chai')
var sinon = require('sinon')
var { timer, logAfter } = require('./helpers')
var spawn = require('../src')
chai.use(require('sinon-chai'))
var expect = chai.expect

describe('spawn function', () => {
    beforeEach(function () {
        if (this.sinon) {
            this.sinon.restore()
        } else {
            this.sinon = sinon.createSandbox()
        }
    })
    it('should log "after" before "timer finished"', async () => {
        const spy = sinon.spy(console, 'log')

        spawn(timer)
        logAfter()

        await new Promise((res) => setTimeout(() => res(null), 1600))

        const result = spy.getCalls().map(({ args }) => args[0])
        console.log(result)
        expect(result.length).to.eq(2)
        expect(result.indexOf('timer finished')).to.be.lessThan(result.indexOf('after'))
    })
})
