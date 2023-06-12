import ContentLoader from 'react-content-loader'

const PizzaSkeleton = () => (
      <ContentLoader
            className='pizza-block'
            speed={2}
            width={280}
            height={475}
            viewBox='0 0 280 475'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
      >
            <circle cx='138' cy='123' r='120' />
            <rect x='10' y='255' rx='9' ry='9' width='265' height='30' />
            <rect x='10' y='292' rx='10' ry='10' width='265' height='92' />
            <rect x='14' y='409' rx='10' ry='10' width='90' height='27' />
            <rect x='126' y='401' rx='30' ry='30' width='150' height='46' />
      </ContentLoader>
)

export default PizzaSkeleton
