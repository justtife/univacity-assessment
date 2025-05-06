import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SharedComponents from 'src/app/components/components';
import { IonicComponents } from 'src/app/components/ionic-components';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.page.html',
  styleUrls: ['./program-detail.page.scss'],
  standalone: true,
  imports: [IonicComponents, SharedComponents]
})
export class ProgramDetailPage implements OnInit {
  courseId: string | null = null;
  showFullDescription = false;

  course: any = {
    id: '123',
    title: 'Environmental Systems Sciences / Climate and Environmental Monitoring',
    university: 'University of Liverpool',
    country: 'United States',
    backImageUrl: 'assets/images/background.png',
    mainImageUrl: 'assets/images/logo.png',
    shortDesc: "The master's programme in Environmental Systems Sciences / Climate and Environmental Monitoring at the University of Graz offers a wide spectrum of disciplines, challenging students to develop improved strategies and solutions.This unique programme equips students with the skills to tackle environmental problems effectively.",
    views: 191126,
    impressions: 293612,
    description: `Studying Environmental Systems Sciences / Climate and Environmental Monitoring at the University of Graz opens up a world of opportunities. By combining various disciplines and developing cross-sectional knowledge, students learn to address pressing environmental challenges with innovative and effective strategies.`,
    programBreakdown: [
      {
        title: '2 Years',
        subtitle: 'Duration'
      },
      {
        title: 'Masters',
        subtitle: 'Level'
      },
      {
        title: '$377.06 per semester',
        subtitle: 'Tuition Fee'
      },
      {
        title: 'On Campus',
        subtitle: 'Attendance'
      },
      {
        title: 'Fulltime',
        subtitle: 'Attendance'
      }
    ],
    requirements: ["Completed relevant degree program", "Copy of a valid Identification Card or Passport", "Degree Diploma", "Documents of completed university degree with a minimum study duration of three years (bachelor’s or diploma)"],
    structure: "Studying Environmental Systems Sciences / Climate and Environmental Monitoring at the University of Graz opens up a world of opportunities. By combining various disciplines and developing cross-sectional",
    feeBreakdown: [
      {
        price: 0,
        currency: 'USD',
        title: 'Housing Fee'
      },
      {
        price: 0,
        currency: 'USD',
        title: 'Acceptance Fee'
      },
      {
        price: 0,
        currency: 'USD',
        title: 'Tuition Fee'
      },
      {
        price: 0,
        currency: 'USD',
        title: 'Application Fee'
      },
      {
        price: 0,
        currency: 'USD',
        title: 'Living Fee'
      }
    ],
    extra_info: ["Main, Portierloge Wall, Portierloge ReSoWi, Portierloge Hauptgebäude", "Winter 2024", "English Language"],
  };
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');

  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
}
