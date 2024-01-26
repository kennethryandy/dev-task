use crate::config;
use std::io::Error;

pub struct Folder {
    folder_name: String,
}

impl Folder {
    pub fn init(folder_name: String) -> Self {
        Self { folder_name }
    }

    pub fn new(&self) -> Result<(), Error> {
        config::AppFileHandler::new().create_dir(&self.folder_name.as_str())
    }
}
