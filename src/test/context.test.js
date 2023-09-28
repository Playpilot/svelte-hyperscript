import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/svelte'
import { getContext } from 'svelte'
import Fragment from '@mitcheljager/svelte-fragment-component'

import h from '../lib/h'

describe('context API', () => {
  it('propagates context', () => {
    expect(1).toBe(1)
  })
})
