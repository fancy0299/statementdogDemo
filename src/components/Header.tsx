'use client'
import Searchbox from '@/components/Searchbox'

function Header() {
  return ( 
    <div
      className="flex h-16 shrink-0 items-center justify-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white"
    >
      <Searchbox />
    </div>
   );
}

export default Header;