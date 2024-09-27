import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';


export default function MobileViewComponent() {

  const navigate = useNavigate();
  const location = useLocation();

  const {heading, content} = location.state || {};

  const editor = useRef(null);

  const config = useMemo(() => ({
      readonly: true, 
      placeholder: 'Start typing...'
  }), []);

  return (
    <div className="d-flex flex-column">
      <div>
        <h3 className="my-2 mx-3">View Note</h3>
      </div>
      <div>
        <form>
          <div className="mb-3 mx-3">
            <label htmlFor="heading" className="form-label"><strong>Heading</strong></label>
            <input
            type="text"
            className="form-control"
            disabled={true}
            value={heading}
            />
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="content" className="form-label"><strong>Content</strong></label>
            <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1}
                />
          </div>
          <div className="d-flex justify-content-start">
            <Button variant="success" className="ms-3" onClick={() => navigate('/home')}>Go Back to Home Page</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
