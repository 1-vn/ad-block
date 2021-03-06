/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
/* global describe, it, before */

const assert = require('assert')
const {AdBlockClient} = require('../..')

describe('getFingerprint', function () {
  before(function () {
    this.adBlockClient = new AdBlockClient()
  })
  it('Extracts simple fingerprint', function () {
    assert.equal(this.adBlockClient.getFingerprint('fdasfdsafdas'), 'fdasfd')
  })
  it('Does not use special characters for fingerprints', function () {
    assert.equal(this.adBlockClient.getFingerprint('*fdasfdsafdas'), 'fdasfd')
  })
  it('Extracts host anchored filter fingerprint', function () {
    assert.equal(this.adBlockClient.getFingerprint('||onevn.com'), 'onevn.')
  })
  it('Does not extract a fingerprint for strings that are too short', function () {
    assert.equal(this.adBlockClient.getFingerprint('prime'), undefined)
  })
  it('Does not extract a fingerprint for blacklisted strings', function () {
    assert.equal(this.adBlockClient.getFingerprint('https://'), undefined)
  })
  it('Extract a fingerprint for short host anchored filters', function () {
    assert.equal(this.adBlockClient.getFingerprint('||a.ca/brianbondy'), 'a.ca/b')
  })
})
