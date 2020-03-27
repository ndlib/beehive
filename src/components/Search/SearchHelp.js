import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HelpIcon from '@material-ui/icons/Help'

const useStyles = makeStyles({
  openLink: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    background: 'none',
    border: 'none',
    textTransform: 'none',
    color: 'white',
    fontSize: '16px',
    padding: '0 20px 0 4px',
    width: 'auto',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  closeButton: {
    fontSize: '14px',
  },
  icon: {
    fontSize: '24px',
    width: '24px',
    marginRight: '4px',
    color: 'black',
  },
})

const SearchHelp = () => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='searchHelp'>
      <button
        label='Search Help'
        onClick={handleOpen}
        title='Click for search help'
        className={classes.openLink}
      >
        <HelpIcon className={`material-icons ${classes.icon}`} alt='help' />
        Search Help
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search Help</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h4>Keywords and Phrases</h4>
            <p>
              By default, keywords entered into search are looked up independently. Results will include all entries
              that contain metadata including at least one of the keywords. The special word AND can be used to return
              only results that match multiple keywords/phrases. In addition, quotes can be used around keywords to
              search for an exact phrase that must occur within a single field.

              Keywords are broken up by certain punctuation marks. For instance, to search for a number with a decimal
              point, you may need to include quotes around the number so it is treated as one keyword and not two.
            </p>
            <div>
              <span>Examples:</span>
              <div className='examples'>
                <pre className='searchExample'>
                  <code className='leftSide'>red balloon</code>
                  <code className='rightSide'>
                    <span>The red sea</span>
                    <span>Balloons are fun</span>
                    <span>Boy holding a balloon</span>
                  </code>
                </pre>
                <pre className='searchExample'>
                  <code className='leftSide'>red AND balloon</code>
                  <code className='rightSide'>
                    <span>Red skies with a balloon</span>
                    <span>The balloon is big and red</span>
                    <span>Balloons and the color red</span>
                  </code>
                </pre>
                <pre className='searchExample'>
                  <code className='leftSide'>"red balloon"</code>
                  <code className='rightSide'>
                    <span>A red balloon at a party</span>
                    <span>Did you see the red balloon?</span>
                  </code>
                </pre>
                <pre className='searchExample'>
                  <code className='leftSide'>12.756</code>
                  <code className='rightSide'>
                    <span>12 is the magic number</span>
                    <span>Running in a circle 756 times</span>
                  </code>
                </pre>
                <pre className='searchExample'>
                  <code className='leftSide'>"12.756"</code>
                  <code className='rightSide'>
                    <span>Record Number: 12.756</span>
                  </code>
                </pre>
              </div>
            </div>
            <h4>Wildcards</h4>
            <p>
              Use an asterisk (*) for wildcard searching. This can be used as a substitute for the middle or end of a
              word.
            </p>
            <div>
              <span>Examples:</span>
              <div className='examples'>
                <pre className='searchExample'>
                  <code className='leftSide'>Fran*</code>
                  <code className='rightSide'>
                    <span>Francis</span>
                    <span>Francesca</span>
                    <span>frantic</span>
                  </code>
                </pre>
                <pre className='searchExample'>
                  <code className='leftSide'>col*r</code>
                  <code className='rightSide'>
                    <span>color</span>
                    <span>colour</span>
                    <span>collar</span>
                  </code>
                </pre>
              </div>
            </div>
            <h4>Proximity Search</h4>
            <p>
              A proximity search can be performed by using the tilde (~) followed by a number after a phrase enclosed in
              quotes. This will return results where the words specified are no more than N words apart in a field.
              (Where N is the number specified.)
            </p>
            <div>
              <span>Examples:</span>
              <div className='examples'>
                <pre className='searchExample'>
                  <code className='leftSide'>"large ruins"~4</code>
                  <code className='rightSide'>
                    <span>Large picture of ruins</span>
                    <span>Lost ruins. Large and strong.</span>
                    <span>Antique ruins with a large urn</span>
                  </code>
                </pre>
                <pre className='searchExample'>
                  <code className='leftSide'>"large ruins"~6 OR "large debris"~3</code>
                  <code className='rightSide'>
                    <span>Some debris. A large battlefield</span>
                    <span>Large and in charge. Ruins remain</span>
                  </code>
                </pre>
              </div>
            </div>
            <h4>Grouping and Filtering</h4>
            <p>
              Parentheses can be used to group keywords or phrases. This is typically combined with the special words OR
              and AND for more complex filtering logic. The minus symbol (-) or the word NOT can be used to exclude
              results which contain a specific term.
            </p>
            <div>
              <span>Examples:</span>
              <div className='examples'>
                <pre className='searchExample'>
                  <code className='leftSide'>(Bishop OR "high priest") AND angel</code>
                  <code className='rightSide'>
                    <span>An angel and a high priest</span>
                    <span>The bishop sees an angel</span>
                  </code>
                </pre>
                <pre className='searchExample'>
                  <code className='leftSide'>bishop NOT angel</code>
                  <code className='rightSide'>
                    <span>A bishop is appointed</span>
                    <span>A priest and a bishop</span>
                  </code>
                </pre>
                <pre className='searchExample'>
                  <code className='leftSide'>"high priest" -angel</code>
                  <code className='rightSide'>
                    <span>High Priest at a temple</span>
                    <span>Speak to the high priest</span>
                  </code>
                </pre>
              </div>
            </div>
            <h4>More Info</h4>
            <span>
              For a more in-depth explanation of everything that is supported, see&nbsp;
              <a
                href='https://lucene.apache.org/core/2_9_4/queryparsersyntax.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                the official lucene query syntax
              </a>.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.closeButton} onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SearchHelp
