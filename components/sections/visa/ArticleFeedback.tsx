'use client'

import { useState } from 'react'

type FeedbackValue = null | 'yes' | 'no'

export function ArticleFeedback() {
  const [feedback, setFeedback] = useState<FeedbackValue>(null)

  return (
    <section className="mx-auto mt-20 max-w-2xl border-t border-black/10 pt-12 text-center">
      <h4 className="mb-6 text-[17px] font-semibold text-[#1d1d1f]">Bu maqola foydali bo&apos;ldimi?</h4>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => setFeedback('yes')}
          className="min-w-[80px] rounded-full border border-[rgba(0,0,0,0.12)] bg-white px-[24px] py-[10px] text-[15px] font-normal text-[#1d1d1f] transition duration-200 hover:border-[#00236f] hover:text-[#00236f]"
        >
          Ha
        </button>
        <button
          type="button"
          onClick={() => setFeedback('no')}
          className="min-w-[80px] rounded-full border border-[rgba(0,0,0,0.12)] bg-white px-[24px] py-[10px] text-[15px] font-normal text-[#1d1d1f] transition duration-200 hover:border-[#00236f] hover:text-[#00236f]"
        >
          Yo&apos;q
        </button>
      </div>
      {feedback ? <p className="mt-5 text-[15px] text-[#6e6e73]">Fikringiz uchun rahmat</p> : null}
    </section>
  )
}

export default ArticleFeedback
