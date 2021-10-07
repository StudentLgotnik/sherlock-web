import React, {useRef} from 'react';

const MyComponent = (props) => {

  const form = useRef(null)

  const submit = e => {
    e.preventDefault()
    const data = new FormData(form.current)
    fetch('/api/cluster/', { method: 'POST', body: data})
      .then(res => res.json())
      .then(json => props.handleClusters(json))
  }

  return (
    <form ref={form} onSubmit={submit}>
      <table>
        <tr><td>File to upload:</td><td><input type="file" name="files" /></td></tr>
        <tr><td></td><td><input type="submit" value="Upload" /></td></tr>
      </table>
    </form>
  )
};

export default MyComponent;
