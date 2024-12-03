document.addEventListener("DOMContentLoaded", () => {
  console.log("v1.4");

  // nav elements
  const countDisplay = document.getElementById("count-display");
  const countType = document.getElementById("count-type");
  const templateType = document.getElementById("template-type");
  const contentContainer = document.getElementById("content-container");

  let textarea;
  let promptArea;

  function countWords(text) {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  }

  function updateCount() {
    if (textarea && countDisplay && countType) {
      const text = textarea.value;
      const count =
        countType.value === "chars" ? text.length : countWords(text);
      countDisplay.textContent = count;
    }
  }

  function saveContent() {
    if (textarea) {
      localStorage.setItem("writeContent", textarea.value);
    }
    if (promptArea) {
      localStorage.setItem("promptContent", promptArea.value);
    }
  }

  function loadContent() {
    if (textarea) {
      textarea.value = localStorage.getItem("writeContent") || "";
    }
    if (promptArea) {
      promptArea.value = localStorage.getItem("promptContent") || "";
    }
  }

  function updateTemplate() {
    saveContent();
    console.log("Template type:", templateType.value);
    const filePath = `templates/${templateType.value}.html`;
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        contentContainer.innerHTML = data;
        textarea = document.getElementById("write");
        promptArea = document.getElementById("prompt");
        loadContent();
        if (textarea) {
          textarea.addEventListener("input", updateCount);
        }
        if (promptArea) {
          promptArea.addEventListener("input", () => autoResize(promptArea));
        }
        autoResize(promptArea);
      })
      .catch((error) => console.error("Error loading template:", error));
  }

  function autoResize(element) {
    if (element) {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }
  }

  updateTemplate();

  countType.addEventListener("change", updateCount);
  templateType.addEventListener("change", updateTemplate);

  // Initial setup
});
