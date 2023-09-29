import { describe, expect, it } from 'vitest'
import { render, act } from '@testing-library/svelte'
import { writable } from 'svelte/store'
import Fragment from '@playpilot/svelte-fragment-component'

import h from '../lib/h'

describe('html', () => {
  it('supports nested html', () => {
    const { getByRole } = render(
      h('h1', { class: 'large' }, 'Hello ', h('strong', null, 'World'), '!'),
    )
    const heading = getByRole('heading')

    expect(heading.outerHTML).toMatch('<h1 class="large">Hello <strong>World</strong>!</h1>')
  })

  it('allows to use a store as child', async () => {
    const count = writable(0)

    // <span>count: {$count}</span>
    const { container } = render(h('span', null, 'count: ', count))

    expect(container.innerHTML).toContain('<span>count: 0</span>')

    await act(() => count.set(1))
    expect(container.innerHTML).toContain('<span>count: 1</span>')

    await act(() => count.set(-1))
    expect(container.innerHTML).toContain('<span>count: -1</span>')
  })

  it('ignores undefined, null & false children', () => {
    const { container } = render(h('p', null, 'There', null, ' are ', '', 5, undefined, ' icons'))

    expect(container.innerHTML).toContain('<p>There are 5 icons</p>')
  })
})
