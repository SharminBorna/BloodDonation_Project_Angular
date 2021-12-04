using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BloodDonation.Models
{
    public class BloodStock
    {
        public int BloodStockID { get; set; }
        [Required, ForeignKey("BloodGroup"), Display(Name = "Blood Group")]
        public int BloodGroupID { get; set; }
        public string BagNumber { get; set; }
        [Required, Column(TypeName = "date"), Display(Name = "Entry Date")]
        public DateTime EntryDate { get; set; }
        [Required, Column(TypeName = "date"), Display(Name = "Expired  Date")]
        public DateTime ExpiredDate { get; set; }
        public int SelfNumber { get; set; }
        [Required, ForeignKey("Profile"), Display(Name = "Donor Name")]
        public int ProfileId { get; set; }

        //navigation
        public virtual BloodGroup BloodGroup { get; set; }
        public virtual Profile Profile { get; set; }
    }
}
