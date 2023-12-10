"use client"
import React, {useRef, useState, useEffect} from 'react'

  import { PRODUCT_CATEGORIES } from '@/config'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null)
    const isAnyOpen = activeIndex !== null

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {

          setActiveIndex(null)
        }
      }

      document.addEventListener('keydown', handler)

      return () => document.removeEventListener('keydown', handler)

    }, [])




    const Navref = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(Navref, () => setActiveIndex(null))


  return (
    <div className='flex gap-4 h-full' ref={Navref}>
    {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null)
          } else {
            setActiveIndex(i)
          }
        }

        const close = () => setActiveIndex(null)

        const isOpen = i === activeIndex

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            close={close}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        )
      })}
    </div>
  )
}

export default NavItems