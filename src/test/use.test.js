import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/svelte'

import h from '../lib/h'

describe('use:action', () => {
  it('it call action factory', async () => {
    const firstActionDestroy = vi.fn()
    const firstAction = vi.fn(() => {
      return {
        destroy: firstActionDestroy,
      }
    })

    const secondAction = vi.fn()

    const { getByRole, unmount } = render(
      h('h1', { 'use:first': firstAction, 'use:second': secondAction }),
    )

    const h1 = getByRole('heading')

    expect(firstAction).toHaveBeenCalledWith(h1)
    expect(secondAction).toHaveBeenCalledWith(h1)

    await unmount()

    expect(firstActionDestroy).toHaveBeenCalled()
  })
})
