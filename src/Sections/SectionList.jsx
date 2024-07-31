export const SectionList = ({sections}) => {
    return (
        <div className="section-list-container">
            {sections.map((section) => (
                <div key={section.id}>{section.sectionName}: {section.totalRows}</div>
            ))}
        </div>
    )
}