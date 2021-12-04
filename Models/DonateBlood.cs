using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BloodDonation.Models
{
    public class DonateBlood
    {
        public int DonateBloodID { get; set; }
        [Column(TypeName = "date"), Display(Name = "Donation Date")]
        public DateTime LastDonationDate { get; set; }
        //FK
        [ForeignKey("BloodRequest"), Display(Name = "Patient Name")]
        public int? BloodRequestID { get; set; }
        //FK
        [ForeignKey("Profile"), Display(Name = "Donor Name")]
        public int ProfileID { get; set; }
        //FK
        [ForeignKey("Location"), Display(Name = "Location Name")]
        public int LocationID { get; set; }
        //FK
        [ForeignKey("Hospital"), Display(Name = "Hospital Name")]
        public int HospitalID { get; set; }
        public int Quantity { get; set; }

        //navigation
        public virtual BloodRequest BloodRequest { get; set; }
        public virtual Profile Profile { get; set; }
        public virtual Location Location { get; set; }
        public virtual Hospital Hospital { get; set; }
    }
}
