import { describe, expect, it } from 'vitest'
import { render, act } from '@testing-library/svelte'
import { writable, derived } from 'svelte/store'

import { h } from '../lib/h'

describe('class:name', () => {
  it('should toogle the classes', async () => {
    const isActive = writable(false)
    const isNotActive = derived(isActive, (active) => !active)
    const isAdmin = writable(true)

    const { getByRole } = render(
      h(
        'h1',
        { 'class:active': isActive, 'class:inactive': isNotActive, 'class:isAdmin': isAdmin },
        'Wellcome back!',
      ),
    )

    const h1 = getByRole('heading')

    expect(h1.getAttribute('class').split(' ')).toContain('inactive', 'isAdmin')
    expect(h1.getAttribute('class').split(' ')).not.toContain('active')

    await act(() => isActive.set(true))

    expect(h1.getAttribute('class').split(' ')).toContain('active', 'isAdmin')
    expect(h1.getAttribute('class').split(' ')).not.toContain('inactive')

    await act(() => isAdmin.set(false))

    expect(h1.getAttribute('class').split(' ')).toContain('active')
    expect(h1.getAttribute('class').split(' ')).not.toContain('inactive', 'isAdmin')
  })
})
