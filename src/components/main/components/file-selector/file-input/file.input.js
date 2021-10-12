import React from 'react';
import styles from "./file.input.module.css"

const FileInput = () => {
  return (
    <>
      <input type="file" id="upload" name="files" multiple="multiple" hidden/>
      <label htmlFor="upload" className={styles.fileInput}>Choose file</label>
    </>
  );
};

export default FileInput;
