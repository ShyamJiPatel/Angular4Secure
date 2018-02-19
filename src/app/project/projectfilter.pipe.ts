import { Pipe, PipeTransform } from '@angular/core';

import { Project } from './project';

@Pipe({
    name: 'projectfilter',
    pure: false
})
export class ProjectFilterPipe implements PipeTransform {
  transform(items: Project[], filter: Project): Project[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Project) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Project} project The project to compare to the filter.
   * @param {Project} filter The filter to apply.
   * @return {boolean} True if project satisfies filters, false if not.
   */
  applyFilter(project: Project, filter: Project): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (project[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (project[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}