import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import Image from "next/Image"
import ErrorBoundary from "@/components/common/ErrorBoundary"
const EnhancedImage = (props) => {
  const { src, fallbackSrc, ...rest } = props
  const [imgSrc, set_imgSrc] = useState(src)

  useEffect(() => {
    set_imgSrc(src)
  }, [src])

  const ErrorFallback = () => {
    return <div>1111111</div>
  }

  return (
    <Wrapper>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Image
          alt="img"
          {...rest}
          src={imgSrc}
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0) {
              // Broken image
              set_imgSrc(fallbackSrc)
            }
          }}
          onError={() => {
            set_imgSrc(fallbackSrc)
          }}
        ></Image>
      </ErrorBoundary>
    </Wrapper>
  )
}

export default EnhancedImage

const Wrapper = styled.div``
