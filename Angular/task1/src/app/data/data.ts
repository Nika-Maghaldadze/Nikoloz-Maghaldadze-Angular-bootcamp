export class Data {

  public buttons = [
    this.createStandard("primary"),
    this.createStandard("secondary"),
    this.createStandard("success"),
    this.createStandard("warning"),
    this.createStandard("danger"),
    this.createOutlineCategory(),
    this.createIconCategory()
  ];

  // STANDARD CATEGORY
  private createStandard(type: string) {
    return {
      type,
      groups: [
        {
          title: "Sizes",
          items: [
            { label: "Small", type, size: "small", disabled: false },
            { label: "Medium", type, size: "medium", disabled: false },
            { label: "Large", type, size: "large", disabled: false },
            { label: "Extra Large", type, size: "extra large", disabled: false }
          ]
        },
        {
          title: "States",
          items: [
            { label: "Normal", type, size: "medium", disabled: false },
            { label: "Hover", type: `${type}-hover`, size: "medium", disabled: false },
            { label: "Active", type: `${type}-active`, size: "medium", disabled: false },
            { label: "Disabled", type, size: "medium", disabled: true },
            { label: "Loading", type, size: "medium", disabled: false }
          ]
        }
      ]
    };
  }

  // OUTLINE CATEGORY
  private createOutlineCategory() {
    return {
      type: "outline",
      groups: [
        {
          title: "Outline",
          items: [
            { label: "Primary", type: "outline-primary", size: "medium", disabled: false },
            { label: "Secondary", type: "outline-secondary", size: "medium", disabled: false },
            { label: "Success", type: "outline-success", size: "medium", disabled: false },
            { label: "Warning", type: "outline-warning", size: "medium", disabled: false },
            { label: "Danger", type: "outline-danger", size: "medium", disabled: false },
          ]
        },
        {
          title: "Outline States",
          items: [
            { label: "Normal", type: "outline-primary", size: "medium", disabled: false },
            { label: "Disabled", type: "outline-primary", size: "medium", disabled: true },
            { label: "Loading", type: "outline-primary", size: "medium", disabled: false },
          ]
        }
      ]
    };
  }

  // ICON CATEGORY
  private createIconCategory() {
    return {
      type: "icon",
      groups: [
        {
          title: "With Icons",
          items: [
            { label: "download", type: "primary", size: "medium", disabled: false },
            { label: "confirm", type: "success", size: "medium", disabled: false },
            { label: "delete", type: "danger", size: "medium", disabled: false },
            { label: "edit", type: "warning", size: "medium", disabled: false }
          ]
        },
        {
          title: "Without Icons",
          items: [
            { label: "heart", type: "danger", size: "medium", disabled: false },
            { label: "share", type: "primary", size: "medium", disabled: false },
            { label: "star", type: "warning", size: "medium", disabled: false },
            { label: "x", type: "secondary", size: "medium", disabled: false }
          ]
        }
      ]
    };
  }

}