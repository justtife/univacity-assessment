import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SharedComponents from 'src/app/components/components';
import { IonicComponents } from 'src/app/components/ionic-components';
import { Program } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.page.html',
  styleUrls: ['./program-detail.page.scss'],
  standalone: true,
  imports: [IonicComponents, SharedComponents]
})
export class ProgramDetailPage implements OnInit {
  showFullDescription = false;
  // course: Program | undefined = undefined;
  course: any = {
    "id": "aB3dEfG7hI9",
    "title": "Environmental Systems Sciences / Climate and Environmental Monitoring",
    "description": "Studying Environmental Systems Sciences / Climate and Environmental Monitoring at the University of Graz opens up a world of opportunities. By combining various disciplines and developing cross-sectional knowledge, students learn to address pressing environmental challenges with innovative and effective strategies.",
    "shortDesc": "The master's programme in Environmental Systems Sciences / Climate and Environmental Monitoring at the University of Graz offers a wide spectrum of disciplines, challenging students to develop improved strategies and solutions.This unique programme equips students with the skills to tackle environmental problems effectively.",
    "country": "United States",
    "university": "University of Liverpool",
    "backImageUrl": "assets/images/background.png",
    "mainImageUrl": "assets/images/logo.png",
    "views": 191126,
    "impressions": 293612,
    "programDetails": {
      "duration": "2 Years",
      "degree_level": "Masters",
      "currency": "USD",
      "tuition": 726.72,
      "study_mode": "Full-time",
      "language": [
        "EN"
      ]
    },
    "requirements": [
      "Completed relevant degree program",
      "Copy of a valid Identification Card or Passport",
      "Degree Diploma",
      "Documents of completed university degree with a minimum study duration of three years (bachelor's or diploma)"
    ],
    "structure": "Studying Environmental Systems Sciences / Climate and Environmental Monitoring at the University of Graz opens up a world of opportunities. By combining various disciplines and developing cross-sectional.",
    "feeBreakdown": [
      {
        "amount": 1500,
        "currency": "USD",
        "description": "Housing Fee"
      },
      {
        "amount": 20,
        "currency": "USD",
        "description": "Acceptance Fee"
      },
      {
        "amount": 300,
        "currency": "USD",
        "description": "amount Fee"
      },
      {
        "amount": 300,
        "currency": "USD",
        "description": "Application Fee"
      },
      {
        "amount": 300,
        "currency": "USD",
        "description": "Living Fee"
      }
    ],
    "additionalInfo": {
      "intake": "Winter 2024",
      "location": "Main, Portierloge Wall, Portierloge ReSoWi, Portierloge Hauptgebäude",
      "applicationDeadline": "2024-05-15"
    }
  };
  constructor(private route: ActivatedRoute, private apiS: ApiService) { }

  async ngOnInit() {
    let courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.getProgramDetail(courseId)
    }
  }
  getProgramDetail(id: string) {
    this.apiS.getProgramById(id).subscribe({
      next: (res) => {
        console.log(res)
        // this.course = res;
      }, error: (e) => console.error(e),
    })
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
}
