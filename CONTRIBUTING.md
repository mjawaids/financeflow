# Contributing to FinanceFlow

Thank you for your interest in contributing to FinanceFlow! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/financeflow-app.git
   cd financeflow-app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary

### React Components
- Use functional components with hooks
- Follow the single responsibility principle
- Use proper prop types and interfaces

### Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design
- Support both light and dark themes

### File Organization
- Keep components in `src/components/`
- Keep contexts in `src/contexts/`
- Keep utilities in `src/utils/`
- Use descriptive file names

## 🎯 Contribution Areas

### High Priority
- Bug fixes
- Performance improvements
- Accessibility enhancements
- Mobile responsiveness
- PWA functionality

### Medium Priority
- New features from the roadmap
- UI/UX improvements
- Code refactoring
- Documentation improvements

### Low Priority
- Code cleanup
- Additional tests
- Developer experience improvements

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, device information
6. **Screenshots**: If applicable

Use the bug report template:

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- Browser: [e.g., Chrome 91]
- OS: [e.g., macOS 11.4]
- Device: [e.g., iPhone 12]

## Screenshots
If applicable, add screenshots
```

## 💡 Feature Requests

For feature requests, please:

1. **Check existing issues** to avoid duplicates
2. **Describe the feature** clearly
3. **Explain the use case** and benefits
4. **Consider implementation** complexity

Use the feature request template:

```markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
What other solutions have you considered?

## Additional Context
Any other context, screenshots, or examples
```

## 🔄 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all tests pass**
4. **Follow the code style guidelines**
5. **Write clear commit messages**
6. **Update the README** if necessary

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 🧪 Testing Guidelines

### Manual Testing
- Test on different browsers
- Test responsive design
- Test PWA functionality
- Test offline capabilities
- Test dark/light mode

### Automated Testing
- Write unit tests for utilities
- Write integration tests for components
- Ensure tests are maintainable

## 📚 Documentation

### Code Documentation
- Use JSDoc comments for functions
- Document complex logic
- Keep comments up to date

### README Updates
- Update features list
- Update installation instructions
- Update usage examples

## 🎨 Design Guidelines

### UI/UX Principles
- Maintain consistency with existing design
- Follow accessibility guidelines
- Ensure mobile-first approach
- Use the established color scheme

### Component Design
- Make components reusable
- Follow atomic design principles
- Ensure proper prop interfaces
- Handle loading and error states

## 🚀 Release Process

1. **Version Bump**: Update version in package.json
2. **Changelog**: Update CHANGELOG.md
3. **Testing**: Comprehensive testing
4. **Documentation**: Update documentation
5. **Release**: Create GitHub release

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Email**: Contact [Jawaid.dev](http://Jawaid.dev) for urgent matters

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to FinanceFlow! 🎉