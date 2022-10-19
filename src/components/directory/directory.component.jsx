import DirectoryItem from '../directory-item/directory-item.component'

import { DirectoryComponent } from './directory.styles'

const Directory = ({categories}) => {
    
    return(
      <DirectoryComponent>
        {
          categories.map((category) => (
            <DirectoryItem category={category} key={category.id} />
          ))
        }
    </DirectoryComponent>
    )
}

export default Directory