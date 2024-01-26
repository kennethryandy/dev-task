use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../src/types/")]
pub struct Note {
    folder_name: String,
    name: String,
    ext: String,
    intermediate_ext: String,
    content: Option<String>,
}

impl Note {
    pub fn new(
        folder_name: &str,
        name: &str,
        ext: &str,
        intermediate_ext: &str,
        content: Option<String>,
    ) -> Self {
        Self {
            folder_name: folder_name.to_string(),
            name: name.to_string(),
            ext: ext.to_string(),
            intermediate_ext: intermediate_ext.to_string(),
            content,
        }
    }
}
