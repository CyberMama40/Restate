const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const README_PATH = path.join(PROJECT_ROOT, 'README.md');
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');

function getComponents() {
  const srcPath = path.join(PROJECT_ROOT, 'src');
  const components = [];
  
  if (!fs.existsSync(srcPath)) {
    return components;
  }
  
  const dirs = fs.readdirSync(srcPath, { withFileTypes: true })
    .filter(item => item.isDirectory());
  
  dirs.forEach(dir => {
    const dirPath = path.join(srcPath, dir.name);
    if (!fs.existsSync(dirPath)) return;
    
    const files = fs.readdirSync(dirPath)
      .filter(f => f.endsWith('.tsx') || f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.css'));
    
    if (files.length > 0) {
      components.push({
        name: dir.name,
        files: files
      });
    }
  });
  
  return components;
}

function updateReadme() {
  if (!fs.existsSync(PACKAGE_JSON_PATH)) {
    console.error('❌ package.json не найден!');
    return;
  }
  
  if (!fs.existsSync(README_PATH)) {
    console.error('❌ README.md не найден!');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  let readme = fs.readFileSync(README_PATH, 'utf8');
  
  const components = getComponents();
  
  // Формируем список зависимостей
  const deps = Object.entries(packageJson.dependencies || {});
  const mainDeps = deps
    .filter(([name]) => !name.includes('dotenv'))
    .map(([name, version]) => `- \`${name}\` ${version}`)
    .join('\n');
  
  const utilDeps = deps
    .filter(([name]) => name.includes('dotenv'))
    .map(([name, version]) => `- \`${name}\` ${version}`)
    .join('\n') || '- Нет утилит';
  
  // Формируем секцию компонентов
  let componentsSection = '';
  if (components.length > 0) {
    components.forEach(comp => {
      const compName = comp.name.charAt(0).toUpperCase() + comp.name.slice(1);
      componentsSection += `### ${compName} (src/${comp.name}/)\n`;
      componentsSection += `Компонент ${comp.name}.\n`;
      comp.files.forEach(file => {
        let fileType = 'файл';
        if (file.includes('.tsx') || file.includes('.jsx')) fileType = 'компонент';
        else if (file.includes('.css')) fileType = 'стили';
        else if (file.includes('.ts') || file.includes('.js')) fileType = 'модуль';
        componentsSection += `- \`${file}\` - ${fileType}\n`;
      });
      componentsSection += '\n';
    });
  } else {
    componentsSection = 'Компоненты пока не добавлены.\n\n';
  }
  
  // Обновляем дату
  const lastUpdate = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Обновляем секцию зависимостей
  const depsRegex = /### Основные[\s\S]*?(?=## |$)/;
  const depsSection = `### Основные\n${mainDeps}\n\n### Утилиты\n${utilDeps}\n\n`;
  
  if (depsRegex.test(readme)) {
    readme = readme.replace(depsRegex, depsSection);
  }
  
  // Обновляем секцию компонентов
  const componentsRegex = /## 🎯 Компоненты и модули[\s\S]*?(?=## |$)/;
  const newComponentsSection = `## 🎯 Компоненты и модули\n\n${componentsSection}`;
  
  if (componentsRegex.test(readme)) {
    readme = readme.replace(componentsRegex, newComponentsSection);
  }
  
  // Обновляем дату последнего обновления
  const dateRegex = /\*\*Последнее обновление:\*\*.*/;
  if (dateRegex.test(readme)) {
    readme = readme.replace(dateRegex, `**Последнее обновление:** ${lastUpdate}`);
  } else {
    // Добавляем в конец, если секции нет
    readme += `\n\n**Последнее обновление:** ${lastUpdate}`;
  }
  
  fs.writeFileSync(README_PATH, readme, 'utf8');
  console.log('✅ README обновлен успешно!');
  console.log(`   - Найдено компонентов: ${components.length}`);
  console.log(`   - Зависимостей: ${deps.length}`);
}

// Запуск
try {
  updateReadme();
} catch (error) {
  console.error('❌ Ошибка при обновлении README:', error.message);
  process.exit(1);
}

