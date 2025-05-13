import React from 'react'
import Link from 'next/link'

type ViewAllBtnProps = {
  to: string
}

const ViewAllBtn: React.FC<ViewAllBtnProps> = ({ to }) => {
  return (
    <Link
      href={to}
      className="px-20 font-semibold hover:bg-black hover:text-white md:w-auto w-full py-3 border border-gray-300 rounded-full text-center block"
    >
      View All
    </Link>
  )
}

export default ViewAllBtn
