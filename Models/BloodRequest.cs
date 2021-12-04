using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BloodDonation.Models
{
    public class BloodRequest
    {
        public int BloodRequestID { get; set; }
        [Required, Display(Name = "Patient Name")]
        public string PatientName { get; set; }
        //FK
        [Required, ForeignKey("BloodGroup"), Display(Name = "Blood Group")]
        public int BloodGroupID { get; set; }
        [Required, StringLength(200), Display(Name = "Reason For Blood")]
        public string ReasonForBlood { get; set; }
        public int Quantity { get; set; }
        //FK
        [ForeignKey("Location"), Display(Name = "Location")]
        public int LocationID { get; set; }
        //FK
        [ForeignKey("Hospital"), Display(Name = "Hospital")]
        public int? HospitalID { get; set; }
        [Required, Display(Name = "Contact No")]
        public string ContactNo { get; set; }
        public string Status { get; set; } //(pending -> accepted/rejected -> completed)?
        [Required, Column(TypeName = "date"), Display(Name = "Donation Date")]
        public DateTime DonationDate { get; set; }
        [Required, Column(TypeName = "date"), Display(Name = "Request Date")]
        public DateTime CreatedAt { get; set; }
        [ForeignKey("RequesterProfile")]
        public int RequesterProfileId { get; set; }
        public Profile RequesterProfile { get; set; }
        [ForeignKey("DonorProfile")]
        public int DonorProfileId { get; set; }
        public Profile DonorProfile { get; set; }

        //navigation
        public virtual BloodGroup BloodGroup { get; set; }
        public virtual Location Location { get; set; }
        public virtual Hospital Hospital { get; set; }
        //navigation
        public virtual ICollection<DonateBlood> DonateBloods { get; set; }

    }
}
