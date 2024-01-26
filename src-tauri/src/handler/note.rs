pub struct Note {
    name: String,
    ext: String,
    content: String,
}

impl Note {
    pub fn new(name: &str, ext: &str, content: &str) -> Self {
        Self {
            name: name.to_string(),
            ext: ext.to_string(),
            content: content.to_string(),
        }
    }
}
