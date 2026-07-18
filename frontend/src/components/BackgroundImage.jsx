function BackgroundImage() {
  return (
    <div 
      className="
        absolute inset-x-0 top-0 h-50 bg-[url('/images/bg-mobile-dark.jpg')] bg-cover
        bg-top-left bg-no-repeat tablet:h-75 tablet:bg-[url('/images/bg-desktop-dark.jpg')]
        light:bg-[url('/images/bg-mobile-light.jpg')] light:tablet:bg-[url('/images/bg-desktop-light.jpg')]
      "
    />
  )
}

export default BackgroundImage;