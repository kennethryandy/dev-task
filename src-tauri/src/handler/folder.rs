use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::config;
use std::io::Error;

use super::note::Note;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../src/types/")]
pub struct Folder {
    pub(crate) folder_name: String,
    pub(crate) notes: Vec<Note>,
}

impl Folder {
    pub fn init(folder_name: &str, notes: Vec<Note>) -> Self {
        Self {
            folder_name: folder_name.to_string(),
            notes,
        }
    }

    pub fn new(&self) -> Result<(), Error> {
        config::AppFileHandler::new().create_dir(&self.folder_name.as_str())
    }
}
